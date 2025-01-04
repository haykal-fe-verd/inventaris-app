<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureVite();
        $this->configureCommands();
        $this->configureModels();
        $this->configureUrl();
    }

    /**
     * Configures the database commands to prohibit destructive operations
     * when the application is in production mode.
     */
    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands($this->app->environment('production'));
    }

    /**
     * Configures the Eloquent models by enabling strict mode
     * and unguarding all models, allowing mass assignment.
     */
    private function configureModels(): void
    {
        Model::shouldBeStrict();
        Model::unguard();
    }

    /**
     * Forces the URL generator to use HTTPS scheme.
     *
     * This is useful to avoid the "Mixed Content" error in the browser.
     */
    private function configureUrl(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }

    /**
     * Configures Vite to use an aggressive prefetch strategy,
     * and sets the concurrency for the prefetching to 3.
     *
     * This is useful to improve the performance of the application.
     */
    private function configureVite(): void
    {
        Vite::usePrefetchStrategy('aggressive');
        Vite::prefetch(concurrency: 3);
    }
}
