-- CreateTable
CREATE TABLE "medical_records" (
    "id" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,
    "allergies" TEXT,
    "chronicDiseases" TEXT,
    "disabilities" TEXT,
    "usesContinuousMedication" BOOLEAN NOT NULL DEFAULT false,
    "currentMedications" TEXT,
    "medicalHistory" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medical_records_residentId_key" ON "medical_records"("residentId");

-- AddForeignKey
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
