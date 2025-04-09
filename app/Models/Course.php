<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $hidden = ['password'];
    protected $fillable = [
        'course_title',
        'course_description',
        'course_image',
        'status',
        'password',
    ];

    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments')
            ->withPivot('enrolled_at', 'expiration_date', 'status')
            ->withTimestamps();
    }

    public function chapters()
    {
        return $this->hasMany(CourseChapter::class);
    }
}
