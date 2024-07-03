'use client'
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
 
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";

function PostNewJob({ profileInfo, user }) {
    console.log(user.id);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  function handlePostNewBtnValid() {
    return Object.keys(jobFormData).every(control => jobFormData[control].trim() !== '');
  }

  async function createNewJob(){
    await postNewJobAction({
        ...jobFormData,
        recruiterId:user?.id,
        applicants : []
    },'/jobs');
    setJobFormData({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.recruiterInfo?.companyName,
    })
    setShowJobDialog(false);
  }
  return (
    <div>
      <Button
        onClick={() => setShowJobDialog(true)}
        className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
      >
        Post A Job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={(isOpen) => {
          setShowJobDialog(isOpen);
          if (!isOpen) {
            setJobFormData({
              ...initialPostNewJobFormData,
              companyName: profileInfo?.recruiterInfo?.companyName,
            });
          }
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <CommonForm
              buttonText={'Add'}
              formData={jobFormData}
              setFormData={setJobFormData}
              formControls={postNewJobFormControls}
              isBtnDisabled={!handlePostNewBtnValid()}
              action ={createNewJob}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostNewJob;
