'use client'

import { mapAsFile } from '@/lib/utils'
import { Form, FormInstance, FormProps, Modal, ModalProps } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import EmployeeSwitchFormItemBox from './employee-switch-form-item-box'
import EmployeeInfomationFormItemBox from './EmployeeInfomationFormItemBox'
import EmployeeResumeFormItemBox from './EmployeeResumeFormItemBox'
import EmployeeSelectFormItemBox from './EmployeeSelectFormItemBox'

export type EmployeeModalFormProps = ModalProps & {
  initialValues?: any
  formProps?: FormProps
  children?: React.ReactNode
}

const EmployeeModalForm: React.FC<EmployeeModalFormProps> = ({
  children,
  formProps,
  initialValues,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [basicSalary, setBasicSalary] = useState(0)
  const [salaries, setSalaries] = useState({
    travel_allowance: 0,
    eat_allowance: 0,
    kpi: 0,
  })

  const formRef = useRef<FormInstance>(null)

  const handleSubmit = (values: any) => {
    const { fileList, education_list, ...restValues } = values

    const originFileList = fileList ? mapAsFile(fileList) : []

    const formData = new FormData()

    originFileList.forEach((file: any) => {
      formData.append('files[]', file)
    })

    const educations = education_list?.map((edu: any) => {
      const { time_range, degree, school, major } = edu

      return {
        account_id: 3,
        school,
        major,
        degree,
        start_date: String(dayjs(time_range[0]).format('YYYY-MM-DD')),
        end_date: String(dayjs(time_range[1]).format('YYYY-MM-DD')),
      }
    })

    // form.setFieldsValue({})

    console.log({
      ...restValues,
      birthday: values.birthday
        ? String(dayjs(values.birthday).format('YYYY-MM-DD'))
        : null,
      official_date: values.official_date
        ? String(dayjs(values.official_date).format('YYYY-MM-DD'))
        : null,
      start_date: values.start_date
        ? String(dayjs(values.start_date).format('YYYY-MM-DD'))
        : null,
      educations,
    })
  }

  const handleSalariesChange = useCallback((_: any, allValues: any) => {
    const { basic_salary, travel_allowance, eat_allowance, kpi } = allValues

    setBasicSalary(+(basic_salary || 0))

    setSalaries((prev: any) => ({
      ...prev,
      travel_allowance: travel_allowance || 0,
      eat_allowance: eat_allowance || 0,
      kpi: kpi || 0,
    }))
  }, [])

  useEffect(() => {
    formRef.current?.setFieldsValue({
      insurance: Number(basicSalary * 0.215),
      insurance_employee: Number(basicSalary * 0.105),
    })
  }, [basicSalary])

  useEffect(() => {
    const insurance = Number(basicSalary * 0.215)
    const insurance_employee = Number(basicSalary * 0.105)
    const total_salary =
      basicSalary +
      salaries.travel_allowance +
      salaries.eat_allowance +
      salaries.kpi

    formRef.current?.setFieldsValue({
      gross_salary: Number(
        (total_salary + insurance + insurance_employee).toFixed(2),
      ),
      net_salary: Number(total_salary.toFixed(2)),
    })
  }, [salaries, basicSalary])

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      <Modal
        title="Thêm nhân sự mới"
        open={open}
        width={846}
        okText="Thêm"
        cancelText="Hủy"
        onCancel={() => setOpen(false)}
        destroyOnClose
        okButtonProps={{
          htmlType: 'submit',
        }}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              bank: 'VietinBank',
            }}
            ref={formRef}
            onValuesChange={handleSalariesChange}
            clearOnDestroy
            {...formProps}
          >
            {dom}
          </Form>
        )}
        {...props}
      >
        <div className="divide-y">
          <EmployeeSelectFormItemBox />

          <EmployeeInfomationFormItemBox className="pt-[16px]" />

          <EmployeeResumeFormItemBox className="mb-0! py-[16px]!" />

          <EmployeeSwitchFormItemBox className="pt-[16px]" />
        </div>
      </Modal>
    </>
  )
}

export default EmployeeModalForm
