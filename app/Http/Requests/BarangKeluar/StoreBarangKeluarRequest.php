<?php

namespace App\Http\Requests\BarangKeluar;

use Illuminate\Foundation\Http\FormRequest;

class StoreBarangKeluarRequest extends FormRequest
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
            'kode_barang_keluar' => 'required',
            'tanggal_keluar' => 'required|date',
            'id_supplier' => 'required|exists:tb_supplier,id',
            'id_barang' => 'required|exists:tb_barang,id',
            'jumlah' => 'required|integer|min:1',
            'tujuan' => 'required|min:3',
            'keterangan' => 'nullable',
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
            'id_barang' => 'Barang',
            'kode_barang_keluar' => 'Kode Barang Masuk',
        ];
    }
}
