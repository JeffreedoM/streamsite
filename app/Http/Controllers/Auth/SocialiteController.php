<?php

namespace App\Http\Controllers\Auth;

use Log;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function googleLogin()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleAuthentication()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::where('google_id', $googleUser->id)->first();

            if ($user) {
                Auth::login($user);

                return redirect()->route('dashboard');
            } else {

                if ($googleUser->email == 'jeffreedomtabz@gmail.com') // add more email to become teacher
                {
                    $roles = json_encode(['teacher', 'student']);
                } else {
                    $roles =  json_encode(['student']);
                }
                $userData = User::create([
                    'name' =>  $googleUser->name,
                    'email' =>  $googleUser->email,
                    'password' => "",
                    'google_id' => $googleUser->id,
                    'avatar' =>  $googleUser->avatar,
                    'roles' => $roles
                ]);

                if ($userData) {
                    Auth::login($userData);
                    return redirect()->route('dashboard');
                }
            }
        } catch (Exception $e) {
            dd($e);
        }
    }
}
