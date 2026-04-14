from pydantic import BaseModel

# This is like a TypeScript Interface for Python
# This basically is defining the format of data which we will use as a type to define format of data coming in a request body
# This is what we expect in a respective reponse
class DataInput(BaseModel):
    text:str