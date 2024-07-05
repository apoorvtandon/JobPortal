import {
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
  createFilterCategoryAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function JobsPage({ searchParams }) {
  console.log(searchParams);
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const profileInfo = await fetchProfileAction(user?.id);
  const jobList =
    profileInfo?.role === "candidate"
      ? await fetchJobsForCandidateAction(searchParams)
      : await fetchJobsForRecruiterAction(user?.id);

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id);

  const fetchFilterCategories = await createFilterCategoryAction();

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={getJobApplicationList}
      filterCategories={fetchFilterCategories}
    />
  );
}

export default JobsPage;
