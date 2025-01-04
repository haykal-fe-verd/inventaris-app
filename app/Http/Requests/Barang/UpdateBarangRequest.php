<?php

namespace App\Http\Requests\Barang;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBarangRequest extends FormRequest
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
            'kode' => 'required|min:3|unique:tb_barang,kode,' . $this->barang->id,
            'nama' => 'required|min:3',
            'stok' => 'required|numeric',
            'harga' => 'required|numeric',
            'satuan' => 'required',
            'deskripsi' => 'nullable',
            'id_kategori' => 'required|exists:tb_kategori,id',
            'id_supplier' => 'required|exists:tb_supplier,id',
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
            'id_kategori' => 'Kategori',
            'id_supplier' => 'Supplier',
        ];
    }
}
