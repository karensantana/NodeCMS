const mongoose = require('mongoose');


const Page = new Schema ({
    title: { type: String, required: true },
    slug: { type: String, required: true },
});