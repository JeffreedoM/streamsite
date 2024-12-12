<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseChapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'chapter_name',
        'chapter_description',
        'course_id',
        'order',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
