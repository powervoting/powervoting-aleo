export default function FormItem ({ children, errors, name }) {
  return (
    <>
      {children}
      {errors[name] && <p className='text-red-500'>This field is required</p>}
    </>
  )
}
