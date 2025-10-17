import { Modal } from "@/shared/ui/Modal"
import { useLoginModal } from "../model"
import { useLogin } from "@/features/login";
import { loginFormSchema } from "@/features/login/model/loginSchema";
import { Form } from "@/shared/ui/Form";
import { formOptions } from "@tanstack/react-form";
import { useSearch } from "@tanstack/react-router";

export const  LoginModal  = () => {
  const {isOpen,close} = useLoginModal()
  const search = useSearch({
    from:'/'
  });
  const { mutate } = useLogin(search);

  const options = formOptions({
    defaultValues: {
      userName: '',
      password: '',
    },
    validators: {
      onChange: loginFormSchema,
    },

    
    onSubmit: ({ value }) => {
      mutate({
        body: {
          password: value.password,
          login: value.userName,
        },
        
      },{
          onSuccess:() => { close(); }
        });
      
    },
  });
  return (
  <Modal opened={isOpen} onClose={close}>


    <Form <typeof options>
      fieldSet={[
        {
          name: 'userName',
          placeholder: 'Имя пользователя',
        },

        {
          name: 'password',
          placeholder: 'Пороль',
        },
      ]}
      options={options}
      title="Вход в систему"
    />
    </Modal>
  );
}
