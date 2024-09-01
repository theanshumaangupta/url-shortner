import mongoose from "mongoose"


const urlSchema = new mongoose.Schema({
    url : {type: String},
    token : {type: String}
})

export const urlTable = mongoose.model("urlTable", urlSchema)