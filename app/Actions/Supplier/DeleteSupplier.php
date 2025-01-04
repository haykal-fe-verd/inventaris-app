<?php

namespace App\Actions\Supplier;

use App\Models\Supplier;

class DeleteSupplier
{
    /**
     * Handle the deletion of a supplier.
     *
     * @param \App\Models\Supplier $supplier
     * @return bool
     */
    public function handle(Supplier $supplier): bool
    {
        return $supplier->delete();
    }
}
