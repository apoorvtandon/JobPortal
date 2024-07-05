"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://pfpysvpxxkgqyhazmrxi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcHlzdnB4eGtncXloYXptcnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5OTkwMzUsImV4cCI6MjAzNTU3NTAzNX0.vIENVhEghJVuYTjOJ-pdq3cRiWokB4k9_Qw3OYTacng"
);
function CandidateList({
  jobApplications,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) {
  console.log(jobApplications, "ap");
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }
  console.log(currentCandidateDetails, "here");

  function handlePreviewResume() {
    const { data } = supabaseClient.storage
      .from("job-board-public")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);
    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleUpdadeJobStatus(getCurrentStatus) {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );
    //console.log(indexOfCurrentJobApplicant);
    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status:
        cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(
          getCurrentStatus
        ),
    };
    //console.log(jobApplicantsToUpdate, "jobApplicantsToUpdate");
    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
    console.log(jobApplications);
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold dark:text-black">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserID
                      )
                    }
                    className="dark:bg-[#fffa27]  flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent>
          <div>
            <h1 className="text-2xl font-bold text-black">
              {currentCandidateDetails?.candidateInfo?.name},
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-medium text-black">
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal text-black">
              {currentCandidateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p>
              Total Experience{" "}
              {currentCandidateDetails?.candidateInfo?.totalExperience} Years
            </p>
            <p>
              {" "}
              Salary:
              {currentCandidateDetails?.candidateInfo?.currentSalary} LPA
            </p>
            <p>
              {" "}
              Notice Period:
              {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
            </p>
            <div className="flex  flex-wrap gap-4 items-center mt-6">
              <h1>Previous Companies</h1>
              {currentCandidateDetails?.candidateInfo?.previousCompanies
                .split(",")
                .map((skillItem) => (
                  <div className="w-[100px] flex justify-center items-center h-[35px] dark:bg-white  bg-black rounded-[4px]">
                    <h2 className="text-[13px] font-medium text-white dark:text-black ">
                      {skillItem}
                    </h2>
                  </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {currentCandidateDetails?.candidateInfo?.skills
                .split(",")
                .map((skillItem) => (
                  <div className="w-[100px] flex justify-center items-center h-[35px] dark:bg-white  bg-black rounded-[4px]">
                    <h2 className="text-[13px] font-medium text-white dark:text-black ">
                      {skillItem}
                    </h2>
                  </div>
                ))}
            </div>
            <div className="flex gap-3 mt-3">
              <Button
                onClick={handlePreviewResume}
                className="flex h-11 items-center justify-center px-5"
              >
                Resume
              </Button>
              <Button
                onClick={() => handleUpdadeJobStatus("selected")}
                className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserID === currentCandidateDetails?.userId
                    )
                    ?.status.includes("selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserID === currentCandidateDetails?.userId
                    )
                    ?.status.includes("rejected")
                    ? true
                    : false
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected")
                  ? "Selected"
                  : "Select"}
              </Button>
              <Button
                onClick={() => handleUpdadeJobStatus("rejected")}
                className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserID === currentCandidateDetails?.userId
                    )
                    ?.status.includes("selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserID === currentCandidateDetails?.userId
                    )
                    ?.status.includes("rejected")
                    ? true
                    : false
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? "Rejected"
                  : "Reject"}
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogFooter></DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;
