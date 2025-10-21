import { Modal } from "@/shared/ui/Modal"
import { useLoginModal } from "../model"
import { useLogin } from "@/features/login";
import { loginFormSchema } from "@/features/login/model/loginSchema";
import { Form } from "@/shared/ui/Form";
import { formOptions } from "@tanstack/react-form";

export const  LoginModal  = () => {
  const store = useLoginModal()
  const { mutate } = useLogin();

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
          onSuccess:() => { store.close(); }
        });
      
    },
  });
  return (
  <Modal  keyModal="login">


    <Form 
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
