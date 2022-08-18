<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $validations = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users|max:155',
            'password' => 'required|min:4',
        ]);


        if ($validations->fails()) {
            $errors = $validations->errors();

            return response()->json([
                'errors' => $errors,
                'status' => 401
            ]);
        }


        if ($validations->passes()) {

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'token' => $token,
                'type' => 'Bearer'
            ]);
        }
    }

    public function login(Request $request)
    {

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'msg' => ' Information de connexion non reconnus',
                'status' => 401
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([
            'token' => $token,
            'type' => 'Bearer ',
            'status'=>200,
        ])->cookie('jwt', $token);
    }

    public function user(Request $request)
    {
        return $request->user();
    }
}
