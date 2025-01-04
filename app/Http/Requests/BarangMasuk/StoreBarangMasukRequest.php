<?php

namespace App\Http\Requests\BarangMasuk;

use Illuminate\Foundation\Http\FormRequest;

class StoreBarangMasukRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'kode_barang_masuk' => 'required',
            'tanggal_masuk' => 'required|date',
            'id_supplier' => 'required|exists:tb_supplier,id',
            'keterangan' => 'nullable',
            'barang' => 'required|array',
            'barang.*.id' => 'required|exists:tb_barang,id',
            'barang.*.jumlah' => 'required|integer|min:1',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'id_supplier' => 'Supplier',
            'kode_barang_masuk' => 'Kode Barang Masuk',
        ];
    }
}
