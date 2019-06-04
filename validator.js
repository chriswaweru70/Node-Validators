const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected to Mongodb...'))
.catch(err => console.error('Could not connect to Mongodb Database due to an error', err));


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
         required: true,
        minLength: 5,
        maxLenght: 255
    },
    category: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 5;
            }, 
            message: 'A Course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished;},
        min: 10,
        max:200
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Mosh',
        tags: null,
        isPublished: true,
        price: 15
});
try {
    const result = await course.save();
    console.log(result);
}
catch (ex) {
    console.log(ex.message);
}


}
createCourse();

async function getCourses() {
     const pageNumber = 2;
     const pageSize =10;

    const courses = await Course
    .find({ author: 'Mosh', isPublished: true })
    // .skip(( pageNumber - 1) * pageSize)
     .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
    console.log(courses);
}



// async function updateCourse(id) {
//    const course = await Course.findByIdAndUpdate({ _id: id }, {
//        $set: {
//            author: 'Chris',
//            isPublished: true
//        }
//    });
//   console.log(course);

// }
// updateCourse('5a68fdc3615eda645bc6bdec');

//    if (!course) return;

//    if(course.isPublishd) return;

//    course.isPublished = true;
//    course.author = 'Another Author';

//    course.set({
//        isPublished: true,
//        author: 'Another Author'
//    })

//    const result = await course.save();
//    console.log(result);
// }

