<?php

namespace App\Http\Controllers;

abstract class Controller
{
    protected const DEFAULT_PER_PAGE = 10;
    protected const DEFAULT_SORT_COLUMN = 'created_at';
}
