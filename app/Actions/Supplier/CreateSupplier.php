<?php

namespace App\Actions\Supplier;

use App\Models\Supplier;

class CreateSupplier
{
    /**
     * Create a new supplier.
     *
     * @param array $validatedData
     * @return \App\Models\Supplier
     * @throws \Exception
     */
    public function handle(array $validatedData): Supplier
    {
        return Supplier::create($validatedData);
    }
}
