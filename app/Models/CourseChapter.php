<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseChapter extends Model
{
    protected $fillable = [
        'chapter_name',
        'chapter_description',
        'course_id',
        'order',
    ];
}
