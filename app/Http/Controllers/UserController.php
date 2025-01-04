<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ImageUpload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    use ImageUpload;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = User::with(['roles:name', 'permissions:name']);

        // filter
        if ($request->has('filter')) {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('name', $request->filter);
            });
        }

        // search
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        // sort
        if ($request->has('sort')) {
            if ($request->sort == 'created_at') {
                $query->orderBy($request->sort, 'desc');
            } else {
                $query->orderBy($request->sort, 'asc');
            }
        } else {
            $query->orderBy(self::DEFAULT_SORT_COLUMN, 'desc');
        }

        // perpage
        $perPage = $request->input('perpage', self::DEFAULT_PER_PAGE);

        // data
        /** @var LengthAwarePaginator $paginated */
        $paginated = $query->paginate($perPage)->appends($request->all());
        $formattedData = $paginated->getCollection()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'email' => $item->email,
                'avatar' => $item->avatar,
                'roles' => $item->roles->pluck('name'),
                'permissions' => $item->permissions->pluck('name'),
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at
            ];
        });
        $paginated->setCollection($formattedData);



        return Inertia::render('user/index', [
            "data" => $paginated
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $roles = Role::all();
        $permissions = Permission::all();
        return Inertia::render('user/create', compact('roles', 'permissions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed|min:8',
            'roles' => 'required|string|exists:roles,name',
            'permissions' => 'required|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->assignRole($request->roles);
        $user->givePermissionTo($request->permissions);

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menambahkan user."));

        return back()->with('success', __('User berhasil dibuat.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $user = User::with(['roles:name', 'permissions:name'])->findOrFail($id);
        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'roles' => $user->roles->pluck('name'),
            'permissions' => $user->permissions->pluck('name'),
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at
        ];

        return Inertia::render('user/detail', compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $roles = Role::all();
        $permissions = Permission::all();
        $user = User::with(['roles', 'permissions'])->findOrFail($id);
        $user = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'roles' => $user->roles->pluck('name'),
            'permissions' => $user->permissions->pluck('name'),
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at
        ];

        return Inertia::render('user/edit', compact('user', 'roles', 'permissions'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'roles' => 'required|string|exists:roles,name',
            'permissions' => 'required|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $user = User::findOrFail($id);
        $user->roles()->detach();
        $user->permissions()->detach();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        $user->assignRole($request->roles);
        $user->givePermissionTo($request->permissions);

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja mengupdate user."));

        return back()->with('success', __('User berhasil diperbarui.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request): RedirectResponse
    {
        $user = User::findOrFail($id);

        if (!is_null($user->avatar)) {
            $this->delete($user->avatar);
        }

        $user->roles()->detach();
        $user->permissions()->detach();
        $user->delete();

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menghapus user."));

        return back()->with('success', __('User berhasil dihapus.'));
    }
}
