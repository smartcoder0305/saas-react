export type ProgramType = {
  id: string;
  programID: number | string;
  title: string;
  description: string;
  summary: string;
  keySkills: string;
  programBenefits: string;
  applicationCriteria: string;
  programType: number;
  minQualification: number;
  startDate: string;
  appOpenDate: string;
  appCloseDate: string;
  duration: string;
  locationID: number;
  maxAppCount: number;
  createdOn: string;
  updatedOn: string;
};
export type summaryProgramType = {
  programId: string;
  title: string;
  location: string;
  workflowStages: WorkflowStageType[];
  teamMembers: TeamMemberType[];
};
export type WorkflowStageType = {
  stageId: string;
  name: string;
  count: number;
};
export type TeamMemberType = {
  userId: string;
  displayPicture: string;
};

export type ProviderSignupType = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  phoneNumber: string;
  country: string;
  companyName: string;
};

export type newProgramType = {
  data: {
    id: string;
    type: string;
    attributes: ProgramDetailsType;
  };
};

export type ProviderType = {
  companyName: string;
  providerId: string;
  providerAlias: string;
  companyLogo?: string;
};

export type ProgramDetailsType = {
  title: string;
  summary: string;
  description: string;
  skills: string[];
  benefits: string;
  applicationCriteria: string;
  programType: string;
  startDate: string;
  applicationOpenDate: string;
  applicationCloseDate: string;
  duration: string;
  location: string;
  minimumQualification: string;
  maxApplication: number;
  isFullyRemote: boolean;
  status: string;
  programProviderId: string;
  coverImage: string;
};
export type ProgramPreviewType = {
  data: {
    id: string;
    type: string;
    attributes: {
      applicationForm: ApplicationFormTemplateType;
      programDetails: ProgramDetailsType;
    };
  };
};
export type candidateApplicationDataType = {
  data: {
    id: string;
    type: string;
    attributes: {
      personalInformation: candidatePersonalInfoType;
    };
  };
};
export type candidateFormProfileType = {
  education: candidateEducationType[];
  workExperience: candidateWorkExperienceType[];
  profileAnswers: candidatePersonAnswerType[];
  resume?: {
    mandatory: boolean;
    show: boolean;
  };
};
export type candidateEducationType = {
  school: string;
  degree: string;
  course: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyStudyHere: boolean;
};
export type candidateWorkExperienceType = {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorkHere: boolean;
};
export type candidatePersonalInfoType = {
  firstName: string;
  lastName: string;
  emailId?: string;
  phoneNumber?: string;
  nationality?: string;
  currentResidence?: string;
  idNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  personalAnswers: candidatePersonAnswerType[];
};
export type candidatePersonAnswerType = {
  id: string;
  answer?: string;
  selectedChoices?: string[];
  question?: string;
  type?: string;
  disqualify?: boolean;
  other?: boolean;
  booleanAnswer: boolean | null;
  numberAnswer: number | null;
  dateAnswer: string | null;
};
export type CandidateApplicationFormType = {
  data: {
    id: string;
    type: string;
    attributes: ApplicationFormTemplateType;
  };
};
export type commonType = {
  internalUse: boolean;
  show: boolean;
};
export type personalInformationType = {
  firstName: commonType;
  lastName: commonType;
  emailId: commonType;
  phoneNumber: commonType;
  nationality: commonType;
  currentResidence: commonType;
  idNumber: commonType;
  dateOfBirth: commonType;
  gender: commonType;
  personalQuestions: candidatePersonalQuestionType[];
};
export type candidatePersonalQuestionType = {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
};
export type candidateProfileApplicationType = {
  education: {
    mandatory: boolean;
    show: boolean;
  };
  experience: {
    mandatory: boolean;
    show: boolean;
  };
  resume: {
    mandatory: boolean;
    show: boolean;
  };
  profileQuestions: [
    {
      id: string;
      type: string;
      question: string;
      choices: string;
      disquality: boolean;
      other: boolean;
    }
  ];
};

export type ApplicationFormTemplateType = {
  coverImage: string;
  personalInformation: personalInformationType;
  profile: candidateProfileApplicationType;
  customisedQuestions: candidateCustomisedQuestionType[];
};
export type candidateCustomisedQuestionType = {
  id: string;
  type: string;
  question: string;
  choices: string;
  disquality: boolean;
  other: boolean;
};

export type ProgramDashboardType = ProgramType[];
export type ProgramSummaryType = {
  data: {
    id: string;
    type: string;
    attributes: {
      programs: [
        {
          programId: string;
          title: string;
          location: string;
          workflowStages: WorkflowStageType[];
          teamMembers: TeamMemberType[];
        }
      ];
    };
  };
};

export type NewProgramType = Omit<ProgramDetailsType, "benefits"> & {
  programApplicationFormDTO: ApplicationFormTemplateType;
  programBenefits: string;
};

export type CandidateType = {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  nationality: string;
  currentlyBased?: string;
  nationalIDNumber?: string;
  dateOfBirth: string;
  gender?: string;
  education?: string;
  experience?: string;
  resume?: string;
};
export type CandidateAppStatusType = {
  data: {
    id: string;
    type: string;
    attributes: {
      applications: applicationType[];
    };
  };
};
export type applicationType = {
  id: string;
  programId: string;
  programCoverImage: string;
  programTitle: string;
  status: string;
  appliedOn: string;
  currentStage: string;
  workflowLastUpdatedOn: string;
  workflowStages: candidateWorkflowStageType[];
};
export type candidateWorkflowStageType = {
  id: string;
  name: string;
};

export type ProgramProviderSignupType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  invitationCode: string;
  jobTitle: string;
  phoneNumber: string;
  providerId: string;
};

export type EmployerSignupType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  invitationCode: string;
  jobTitle: string;
  phoneNumber: string;
  providerId: string;
};

export type EmployerCreateType = {
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  jobTitle: string;
  companyName: string;
  companyType: string;
  companySize: string;
  industry: string;
  location: string;
  phoneNumber: string;
  programId?: string;
  invitationCode: string;
  expiresUtc: string;
};

export type ProgramProps = {
  id: string;
  title: string;
  programType: string;
  startDate: string;
  duration: string;
  location: string;
  status: string;
  coverImage: string;
  opportunities: ProgramOpportunityProps[];
};

export type ProgramOpportunityProps = {
  id: string;
  jobTitle: string;
  location: string;
  typeOfWork: string;
  status: string;
  employer: EmployerProps;
  opportunityStages: OpportunityStageProps[];
};

export type EmployerProps = {
  id: string;
  logo: string;
  name: string;
  website: string;
};

export type OpportunityStageProps = {
  stageId: string;
  name: string;
  count: number;
};

export type NewOpportunityFormProps = {
  jobTitle?: string;
  companyName?: string;
  location?: string;
  seats?: number;
  typeOfWork?: string;
  maxApplications?: number;
  skills?: string[];
  description?: string;
  status?: "Closed" | "Open";
  showToCandidate?: boolean;
  employerId?: string;
};

export type AdminSignupType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  invitationCode: string;
};

export type StageType = {
  stageName: string;
  stageType: number;
};

export type workFlowType = {
  programID: string;
  stageName: string;
  stageType: number;
  stageShownToCandidate: boolean;
};
export type WorkFlowWholeType = {
  data: {
    id: string;
    type: string;
    attributes: {
      stages: workStageType[];
    };
  };
};
export type workStageType = {
  id: string;
  name: string;
  type: string;
  hideFromCandidate: boolean;
  interviewQuestions: interviewQuestionType[];
};
export type interviewQuestionType = {
  id?: string;
  question: string;
  description: string;
  duration: number;
  durationType: string;
  deadlineInDays: number;
};

export type WorkflowType = {
  programID: string | number;
  applied: number;
  videoInterview: number;
  zoomInterview: number;
  inPersonMeeting: number;
  placement: number;
  offered: number;
  workflowStagesList: StageType[];
};
export type CandidateProfileType = {
  data: {
    id: string;
    type: string;
    attributes: {
      personalInformation?: candidatePersonalInfoType;
      profile?: {
        education: candidateEducationType[];
        workExperience: candidateWorkExperienceType[];
        profileAnswers: candidatePersonAnswerType[];
      };
      resume?: string;
      customisedAnswers?: candidatePersonAnswerType[];
      stage?: string;
      status: string;
      overallScore?: string;
    };
  };
};

export type AlertProps = {
  title: string;
  type: "error" | "success" | "info";
  msg: string;
};
export type ProviderFilterCandidateReturnDataType = {
  data: {
    id?: string;
    type?: string;
    attributes: {
      candidates: candidateReturnDataType[];
    };
  };
};
export type candidateReturnDataType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  currentResidence?: string;
  status?: string;
  degree?: string;
};

export type ProviderFilterCandidateDataType = {
  skip?: number;
  take?: number;
  freeFilter?: string;
  nationality?: string[];
  countryOfResidence?: string[];
  gender?: string;
  location?: string[];
  levelOfEducation?: string[];
  dateOfGraduationFrom?: string;
  dateOfGraduationTo?: string;
  locationOfStudy?: string[];
  yearsOfExperienceTo?: number;
  yearsOfExperienceFrom?: number;
  locationOfWork?: string[];
  overralScoreTo?: number;
  overralScoreFrom?: number;
  communication?: number;
  professionalism?: number;
  attitude?: number;
  subjectKnowledge?: number;
  customProfileFilters?: customProfileFilterType[];
  customAnswersFilters?: customAnswerFilterType[];
};
export type customAnswerFilterType = {
  questionId?: string;
  textAnswer?: string;
  numberAnswerFrom?: number;
  numberAnswerTo?: number;
  dateAnswerFrom?: string;
  dateAnswerTo?: string;
  booleanAnswer?: boolean;
};
export type customProfileFilterType = {
  questionId?: string;
  textAnswer?: string;
  numberAnswerFrom?: number;
  numberAnswerTo?: number;
  dateAnswerFrom?: string;
  dateAnswerTo?: string;
  booleanAnswer?: boolean;
};

export const ADMIN_ROUTE = "admin";
export const CANDIDATE = "Candidate";
export const EMPLOYER = "Employer";
export const PROVIDER = "Provider";
export const ADMIN = "Admin";
export const OWNER = "Owner";
export const CONTRIBUTOR = "Candidate";
export const GUEST = "Candidate";
export const NONE = "Candidate";

export const LOADING = "loading";
export const NOT_FOUND = "not_found";
export const VALID_BASENAME = "valid_basename";

export const FULFILLED = "fulfilled";
export const REJECTED = "rejected";

export const OPEN = "Open";
export const CLOSED = "Closed";
export const DRAFT = "Draft";
