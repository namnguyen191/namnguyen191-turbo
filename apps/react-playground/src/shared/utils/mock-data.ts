import { faker } from '@faker-js/faker';

import type { ObjectValue } from './types-helper';

export type MockUserCreditCardData = {
  id: number;
  firstName: string;
  lastName: string;
  outstandingAmount: number;
  upCommingDueDate: string;
  mostRecentMissedPaymentDate: string | null;
};
export type MockUserCreditCardDataValue = ObjectValue<MockUserCreditCardData>;
export const generateMockUserCreditCardData = (numRecords: number): MockUserCreditCardData[] => {
  return Array.from({ length: numRecords }, (_, index) => ({
    id: index + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    outstandingAmount: parseFloat((Math.random() * 5000).toFixed(2)),
    upCommingDueDate: faker.date.future().toISOString(),
    mostRecentMissedPaymentDate: Math.random() < 0.5 ? faker.date.past().toISOString() : null,
  }));
};
