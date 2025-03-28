import { TextInput } from '@carbon/react';
import { type ReactElement, useCallback } from 'react';

export type CustomInputProps = {
  defaultValue?: string;
  onValueChange?: (newVal: string) => void;
};

export const CustomInput = (props: CustomInputProps): ReactElement => {
  const { defaultValue = '', onValueChange = (): void => {} } = props;
  console.log(`Nam data is: custom input re-render`);

  const onValChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(e.target.value);
    },
    [onValueChange]
  );

  return (
    <TextInput defaultValue={defaultValue} onChange={onValChange} id={''} labelText={undefined} />
  );
};
