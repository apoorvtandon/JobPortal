import { fetchJobApplicationsForCandidate, fetchJobApplicationsForRecruiter, fetchJobsForCandidateAction, fetchJobsForRecruiterAction, fetchProfileAction } from "@/actions";
import JobListing from "@/components/job-listing"
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";


 

async function JobsPage ()  {
    const user = await currentUser();
    if(!user)
      {
        redirect('/sign-in')
      }
    const profileInfo = await fetchProfileAction(user?.id);
    const jobList = profileInfo?.role === 'candidate'?
    await fetchJobsForCandidateAction()
    :await fetchJobsForRecruiterAction(user?.id)
    
    const getJobApplicationList = profileInfo?.role === 'candidate'
    ?await fetchJobApplicationsForCandidate(user?.id) 
    :await fetchJobApplicationsForRecruiter(user?.id)
  return (
    <JobListing
    user = {JSON.parse(JSON.stringify(user))}
    profileInfo={profileInfo}
    jobList={jobList}
    jobApplications = {getJobApplicationList}
    />
  )
}

export default JobsPage