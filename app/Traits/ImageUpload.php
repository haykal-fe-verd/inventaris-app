<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


trait ImageUpload
{
    /**
     * Upload a file from a request to the default filesystem disk.
     *
     * @param  Request  $request
     * @param  string  $key
     * @param  string  $path
     * @param  string|null  $existing
     * @return string
     */
    public function upload(Request $request, string $key, string $path, string $existing = null): ?string
    {
        if ($request->hasFile($key)) {
            $request->validate([
                $key => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($existing && Storage::exists($existing)) {
                Storage::delete($existing);
            }

            return $request->file($key)->store($path);
        }

        return $existing;
    }

    /**
     * Delete a file from the default filesystem disk.
     *
     * @param  string  $path
     * @return void
     */
    public function delete(string $path): void
    {
        Storage::delete($path);
    }
}
