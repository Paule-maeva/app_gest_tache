<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;  
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes publiques (sans authentification)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées (nécessitent un token valide)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);

//   CRUD des tâches
Route::get('/tasks', [TaskController::class, 'index']);            // Liste des tâches
Route::post('/tasks', [TaskController::class, 'store']);           // Créer une tâche
Route::put('/tasks/{id}', [TaskController::class, 'update']);      // Modifier une tâche
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);  // Supprimer une tâche
Route::patch('/tasks/{id}/toggle', [TaskController::class, 'toggle']); // Terminer / Annuler
 

});