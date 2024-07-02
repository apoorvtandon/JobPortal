'use client'

import { useState } from "react"
import { Tabs,TabsList,TabsTrigger} from "../ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs";
import CommonForm from "../common-form";
import {
 
    initialRecruiterFormData,
    recruiterOnboardFormControls,
    initialCandidateFormData,
    candidateOnboardFormControls
  } from "@/utils";
export default function OnBoard()
{
    const [currentTab, setCurrentTab] = useState("candidate");
    const [recruiterFormData, setRecruiterFormData] = useState(
      initialRecruiterFormData
    );
    const [candidateFormData, setCandidateFormData] = useState(
        initialCandidateFormData
      );

    function handleChange(value){
        setCurrentTab(value);
    }
    
    return(  
    <div className="bg-white">
           <Tabs value={currentTab} onValueChange={handleChange}>
        <div className="w-full">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-light text-gray-900">Welcome to Onboarding</h1>
                <TabsList>
                    <TabsTrigger value='candidate'>Candidate</TabsTrigger>
                    <TabsTrigger value='recruiter'>Recruiter</TabsTrigger>
                </TabsList>
            </div>
        </div>
        <TabsContent value="candidate"><CommonForm
        formControls={candidateOnboardFormControls} buttonText={'Onboard as candidate'}
        formData = {candidateFormData}
        setFormData = {setCandidateFormData}
        /></TabsContent>
        <TabsContent value="recruiter"><CommonForm
        formControls={recruiterOnboardFormControls} buttonText={'Onboard as recruiter'}
        formData = {recruiterFormData}
        setFormData = {setRecruiterFormData}
        /></TabsContent>
    </Tabs>
    </div>
 )
}