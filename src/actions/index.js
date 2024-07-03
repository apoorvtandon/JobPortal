'use server'

import connectToDB from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { connect } from "mongoose";
import { revalidatePath } from "next/cache";

export async function createProfileAction(formData, pathToRevalidate) {
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
  }
  
  export async function fetchProfileAction(id) {
    await connectToDB();
    const result = await Profile.findOne({ userId: id });
  
    return JSON.parse(JSON.stringify(result));
  }

  export async function postNewJobAction(formData, pathToRevalidate){
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate)
  }

  export async function fetchJobsForRecruiterAction(id) {
    await connectToDB();
    const result = await Job.find({ recruiterId: id });  
    return JSON.parse(JSON.stringify(result));
  }

  export async function fetchJobsForCandidateAction(){
    await connectToDB();
    const result = await Job.find({});  
    return JSON.parse(JSON.stringify(result));
  }

  export async function createJobApplicationAction(data,pathToRevalidate){
    await connectToDB();
    await Application.create(data);
    revalidatePath(pathToRevalidate)

  }
  export async function fetchJobApplicationsForRecruiter(recruiterID) {
    await connectToDB();
    const result = await Application.find({ recruiterUserID: recruiterID });
  
    return JSON.parse(JSON.stringify(result));
  }
  export async function fetchJobApplicationsForCandidate(candidateID) {
    await connectToDB();
    const result = await Application.find({ candidateUserID: candidateID });
  
    return JSON.parse(JSON.stringify(result));
  }
  export async function getCandidateDetailsByIDAction(currentCandidateID) {
    await connectToDB();
    const result = await Profile.findOne({ userId: currentCandidateID });
  
    return JSON.parse(JSON.stringify(result));
  }


  export async function updateJobApplicationAction(data, pathToRevalidate) {
    await connectToDB();
    const {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      _id,
      jobAppliedDate,
    } = data;
    await Application.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        recruiterUserID,
        name,
        email,
        candidateUserID,
        status,
        jobID,
        jobAppliedDate,
      },
      { new: true }
    );
    revalidatePath(pathToRevalidate);
  }