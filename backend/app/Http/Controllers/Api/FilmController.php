<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{

    function index()
    {
        $totalFilms = Film::all();

        return response()->json([
            'films' => $totalFilms,
            'status' => 200,
            'msg' => 'Tout les films ont été recupérés'
        ]);
    }


    function show($id){

        return response()->json([
            'film'=> Film::find($id),
            'status'=> 200,
            'msg'=> 'Film recuperer'
        ]);
    }


    public function store(Request $request, Film $film)
    {

        $url = $request->url;
        $titre = $request->titre;
        $description = $request->description;

        if (!empty($url) && !empty($titre)) {

            $film->url = $url;
            $film->titre = $titre;
            $film->description = $description;
            $film->save();

            return response()->json([
                'film' => $film,
                'status' => 200,
                'msg' => ' Film inserer avec succès'
            ]);
        } else {
            return response()->json(
                [
                    'msg' => 'Veuillez remplir tous les champs',
                    'status' => 400
                ]
            );
        }
    }
}
