export const toFullName = (lastName: string, middleName: string, firstName: string, language: string) => {
  if (language === "vi") {
    const arrayName = [lastName, middleName, firstName]
    const fullname = arrayName.filter(Boolean).join(" ").trim();
    return fullname;
  } else if (language === "en") {
    const arrayName = [firstName, middleName, lastName]
    const fullname = arrayName.filter(Boolean).join(" ").trim();
    return fullname
  }
}

export const convertImgToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};


export const separationFullname = (fullname: string, language: string) => {
  const result = {
    firstName: "",
    middleName: "",
    lastName: ""
  }
  const arrayFullname = fullname.trim().split(" ")?.filter(Boolean);
  if (arrayFullname.length === 1) {
    if (language === "vi") {
      result.firstName = arrayFullname[0];
    } else if (language === "en") {
      result.lastName = arrayFullname[0];
    }
  } else if (arrayFullname.length === 2) {
    if (language === "vi") {
      result.firstName = arrayFullname[0];
      result.lastName = arrayFullname[1];
    } else if (language === "en") {
      result.firstName = arrayFullname[1];
      result.lastName = arrayFullname[0];
    }
  } else if (arrayFullname.length >= 3) {
    if (language === "vi") {
      result.firstName = arrayFullname[0];
      result.middleName = arrayFullname.slice(1, arrayFullname.length - 1).join(" ");
      result.lastName = arrayFullname[arrayFullname.length - 1];
    } else if (language === "en") {
      result.lastName = arrayFullname[0];
      result.middleName = arrayFullname.slice(1, arrayFullname.length - 1).join(" ");
      result.firstName = arrayFullname[arrayFullname.length - 1];
    }
  }
  return result;
}




export const getAllValueObject = (obj: any, arrExlude?: string[]) => {
  try {
    const value: any[] = [];
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        value.push(...getAllValueObject(obj[key],arrExlude))
      } else {
        if(!arrExlude?.includes(obj[key])){
          value.push(obj[key])
        }
      }
    }

    return value;
  } catch (error) {
    return []
  }
}