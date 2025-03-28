import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import IconSuccess from '@/assets/images/icon-success-second-level-password.png';
import IconCancel from '@/assets/images/icon-cancel-second-level-password.png';
import { LockOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Image from "next/image";

type ProfileSecondLevelPasswordModalFormProps = {
    active?: boolean,
    label?: string,
    onChangeValue?: (text: string) => void
}

const ProfileSecondLevelPasswordModalForm: React.FC<ProfileSecondLevelPasswordModalFormProps> = ({
    active,
    onChangeValue,
    label
}) => {
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isModalCancel, setIsModalCancel] = useState(false);

    const handelCancel = () => {
        setIsModalSuccess(false);
        setIsModalCancel(false);
        onChangeValue && onChangeValue("")
    }

    return (
        <>
            <div
                className={clsx(
                    'flex cursor-pointer hover:text-[#1890FF] gap-[10px]',
                    { 'text-[#1890FF]': active }
                )}
                onClick={() => {
                    setIsModalSuccess(true);
                    onChangeValue && onChangeValue(label || "")
                }}>
                <LockOutlined />
                {label}
            </div>

            <Modal
                okText="Lưu"
                cancelText="Hủy"
                title="Mật khẩu cấp hai"
                open={isModalSuccess}
                onOk={handelCancel}
                onCancel={handelCancel}
                width={433}
                footer={null}
            >
                <Form
                    layout="vertical"
                    className="flex flex-col items-center gap-[16px]"
                >
                    <Image
                        src={IconSuccess.src}
                        alt=""
                        className="w-[168px] h-[112px]"
                    />
                    <p>Đã cấp mật khẩu cấp hai</p>
                    <Button
                        type="primary"
                        onClick={() => {
                            setIsModalSuccess(false)
                            setIsModalCancel(true)
                        }}
                    >Yêu cầu cấp lại</Button>
                </Form >
            </Modal >

            <Modal
                okText="Lưu"
                cancelText="Hủy"
                title="Mật khẩu cấp hai"
                open={isModalCancel}
                onOk={handelCancel}
                onCancel={handelCancel}
                width={433}
                footer={null}
            >
                <Form
                    layout="vertical"
                    className="flex flex-col items-center gap-[16px]"
                >
                    <Image
                        src={IconCancel.src}
                        alt=""
                        className="w-[168px] h-[112px]"
                    />
                    <p>Đã gửi yêu cầu cấp lại mật khẩu cấp hai</p>
                    <Button
                        danger
                        onClick={handelCancel}
                    >Huỷ yêu cầu</Button>
                </Form >
            </Modal >
        </>
    )
}

export default ProfileSecondLevelPasswordModalForm;