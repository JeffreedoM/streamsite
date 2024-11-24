<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseChapter extends Model
{
    protected $fillable = [
        'chapter_name',
        'course_id',
        'order',
    ];
}
