<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Correction : 'App' avec A majuscule
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Enregistrement d'un nouvel utilisateur
    public function register(Request $request)
    {
        // Validation des données envoyées via HTTP
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        // Création d'un utilisateur
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']), 
        ]);

        // Génération du token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer', // Correction : 'Bearer' avec B majuscule
            'user' => $user
        ], 201);
    }

    // Connexion d'un utilisateur
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Recherche l'utilisateur par email
        $user = User::where('email', $request->email)->first();
        
        // Vérification des identifiants
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects'], 
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    // Déconnexion d'un utilisateur
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete(); 

        // Correction : $request au lieu de request
        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

    // Récupère les infos de l'utilisateur connecté
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}