export const getValidationSchema = (step: number) => {
  switch (step) {
    case 0:
      return studentStep2Schema;
    case 1:
      return studentStep3Schema;
    case 2:
      return studentStep4Schema;
    case 3:
      return studentStep4Schema;
    case 4:
      return studentStep4Schema;
    default:
      return studentSchema;
  }

  throw new Error(`Invalid role or step: ${step}`);
};
