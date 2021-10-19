op=input("Enter any one(+,-,*,/):")
a=int(input("enter first number:"))
b=int(input("enter second number:"))
if(op=="+"):
   print("Sum of your numbers is", a+b)
elif(op=="-"):
   print("substraction of your numbers is", a-b)
elif(op=="*"):
   print("Multiplication of your two numbers is", a*b)
elif(op=="/"):
   print("Quotient of your two numbers is", a/b)
else:
   print("Plese enter a valid operator") 
