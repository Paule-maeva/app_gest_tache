<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    //fonction pour afficher les tache d'un utilisateur
    public function index(Request $request)
    {
        return Task::where('user_id', $request->user()->id)->get();
    }
// fonction pour la ccreation d'une tache
    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string']);
        
        return Task::create([
            'title' => $request->title,
            'user_id' => $request->user()->id,
            'completed' => false
        ]);
    }
//modification d'une tache
    public function update(Request $request, $id)
    {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $task->update($request->only('title'));
        return $task;
    }
// suppression d'une tache
    public function destroy(Request $request, $id)
    {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $task->delete();
        return response()->json(['message' => 'Tâche supprimée']);
    }
//modification de l'etat d'une tache
    public function toggle(Request $request, $id)
    {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $task->completed = !$task->completed;
        $task->save();
        return $task;
    }
}
