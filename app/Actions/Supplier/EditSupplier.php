<?php

namespace App\Actions\Supplier;

use App\Models\Supplier;

class EditSupplier
{
    /**
     * Edit a supplier.
     *
     * @param array $validatedData
     * @param \App\Models\Supplier $supplier
     * @return bool
     */
    public function handle(Supplier $supplier, array $validatedData): bool
    {
        return $supplier->update($validatedData);
    }
}
