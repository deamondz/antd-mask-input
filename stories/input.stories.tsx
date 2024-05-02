import React, { useMemo } from 'react';
import { Form } from 'antd';
import type { StoryObj, Meta } from '@storybook/react';

import { MaskType, IMask, MaskedInput } from '../src/lib/MaskedInput';

const meta: Meta = {
  title: 'MaskedInput',
  tags: ['autodocs'],
};

export default meta;

declare global {
  interface Window {
    formRef: any;
  }
}

export const Phone: StoryObj = {
  name: 'Phone',
  render: () => (
    <MaskedInput
      mask={
        //  https://imask.js.org/guide.html#masked-pattern
        '+55(00)0000-0000'
      }
    />
  ),
};

export const AMEX: StoryObj = {
  name: 'AMEX',
  render: () => <MaskedInput mask={'0000 000000 00000'} />,
};

const DynamicPhone = (props: any) => {
  const cellphoneMask = '(00) 0 0000-0000';
  const phoneMask = '(00) 0000-0000';

  // always memoize dynamic masks
  const mask = useMemo(
    () => [
      {
        mask: cellphoneMask,
        lazy: false,
      },
      {
        mask: phoneMask,
        lazy: false,
      },
    ],
    [],
  );

  return (
    <MaskedInput
      {...props}
      mask={mask}
      maskOptions={{
        dispatch: function (_appended, dynamicMasked) {
          const isCellPhone = dynamicMasked.unmaskedValue[2] === '9';
          return dynamicMasked.compiledMasks[isCellPhone ? 0 : 1];
        },
      }}
    />
  );
};

export const DynamicMask: StoryObj = {
  name: 'Dynamic Mask',
  render: () => <DynamicPhone />,
};

const maskRGB: MaskType = [
  {
    mask: 'RGB,RGB,RGB',
    blocks: {
      RGB: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 255,
      },
    },
  },
  {
    mask: /^#[0-9a-f]{0,6}$/i,
  },
];
export const RGB: StoryObj = {
  name: 'RGB',
  render: () => <MaskedInput mask={maskRGB} />,
};

/*
stories.add('useForm', () => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    const interval = setInterval(() => {
      form.setFieldsValue({phone: `${Math.random()*1000}`})
    }, 700);

    return () => clearInterval(interval)
  }, [])

  return <Form form={form}>
    <Form.Item
      label="Phone"
      name="phone"
      initialValue={'11'}
    >
      <DynamicPhone />
    </Form.Item>
  </Form>
});
*/

//  https://imask.js.org/guide.html#masked-pattern
export const IP: StoryObj = {
  name: 'Dynamic Mask',
  render: () => (
    <MaskedInput
      mask="0[0][0].0[0][0].0[0][0].0[0][0]"
      value="192.16.1.5" //
    />
  ),
};

window.formRef = {};
export const FormExample: StoryObj = {
  name: 'Form',
  render: () => (
    <Form ref={(val) => (window.formRef = val)}>
      <Form.Item
        label="Username"
        name="username"
        initialValue={'123'}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <DynamicPhone />
      </Form.Item>

      <button>Go</button>
    </Form>
  ),
};
