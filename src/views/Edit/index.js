import React, { useState, useEffect } from "react";
import axios from "axios";
import { Platform, Image } from "react-native";
import {
  VStack,
  Button,
  FormControl,
  Input,
  Heading,
  Avatar,
  Center,
  useToast,
  TextArea,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
const Formulario = (props) => {
  const initialState = {
    btnGuardar: true,
    btnEliminar:true,
    titulo: props.route.params.item.titulo,
  };

  const toast = useToast();
  const [formData, setData] = useState(initialState);
  const [errors, setErros] = useState({});
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);

  const validate = () => {
    if (formData.titulo === undefined) {
      setErros({
        ...errors,
        titulo: "Campo requerido",
      });
      return false;
    }
    if (formData.introduccion === undefined) {
      setErros({
        ...errors,
        introduccion: "Campo requerido",
      });
      return false;
    }
    if (formData.descripcion === undefined) {
      setErros({
        ...errors,
        descripcion: "Campo requerido",
      });
      return false;
    }
    if (formData.btnIcono === undefined) {
      setErros({
        ...errors,
        btnIcono: "Campo requerido",
      });
      return false;
    }
    if (formData.btnPortada === undefined) {
      setErros({
        ...errors,
        btnPortada: "Campo requerido",
      });
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      setData({
        ...formData,
        btnPortada: { uri: localUri, name: filename, type },
      });
    }
  };

  const pickIcon = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      console.log(result.uri);
      setIcon(result.uri);
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // Upload the image using the fetch and FormData APIs
      // Assume "photo" is the name of the form field the server expects
      setData({
        ...formData,
        btnIcono: { uri: localUri, name: filename, type },
      });
    }
  };

  useEffect(() => {
    setIcon(
      "http://localhost/webservice/imagenes/iconos/" +
        props.route.params.item.icono
    );
    setImage(
      "http://localhost/webservice/imagenes/sitios/" +
        props.route.params.item.imagenportada
    );
    setData({
      ...formData,
      id: props.route.params.item.id,
      btnIcono: {
        uri: "f",
        name: "f",
      },
      btnPortada: {
        uri: "f",
        name: "f",
      },
      titulo: props.route.params.item.titulo,
      descripcion: props.route.params.item.descripcion,
      introduccion: props.route.params.item.introduccion,
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          toast.show({
            description:
              "Sorry, we need camera roll permissions to make this work!",
          });
        }
      }
    })();
  }, []);

  const onSubmit = () => {
      
    console.log(formData);
    validate()
      ? axios
          .post(`http://localhost/webservice/formularios/edit.php`, formData)
          .then((response) => {
            toast.show({
              description: "Se edito correctamente",
            });
            props.navigation.navigate('Home')
          })
          .catch((err) => {
            console.log(err);
            toast.show({
              description: "Ocurrio un error.",
            });
          })
      : console.log("Invalido");
  };

  const onDelete = () => {
      let id = formData.id;
      let btn = formData.btnEliminar;
      console.log(parseInt(id))
    axios
      .post(`http://localhost/webservice/formularios/delete.php`, {id:parseInt(id), btnEliminar:btn})
      .then((response) => {
        toast.show({
          description: "Eliminado Correctamente",
        });
        props.navigation.navigate('Home')
      })
      .catch((err) => {
        console.log(err);
        toast.show({
          description: "Ocurrio un error.",
        });
      });
  };

  return (
    <VStack width="90%" mx="3">
      <Heading textAling="center">Turismo</Heading>
      <FormControl
        isRequired
        isInvalid={
          "titulo" in errors ||
          "introduccion" in errors ||
          "descripcion" in errors ||
          "btnIcono" in errors ||
          "btnPortada" in errors
        }
      >
        <FormControl.Label _text={{ bold: true }}>Titulo</FormControl.Label>
        <Input
          placeholder="Titulo"
          onChangeText={(value) => setData({ ...formData, titulo: value })}
          defaultValue={formData.titulo}
        />
        {"titulo" in errors ? (
          <FormControl.ErrorMessage
            _text={{ fontSize: "xs", color: "error.500", fontWeight: 500 }}
          >
            {errors.titulo}
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
        <FormControl.Label _text={{ bold: true }}>
          Introduccion
        </FormControl.Label>
        <Input
          placeholder="Introduccion"
          onChangeText={(value) =>
            setData({ ...formData, introduccion: value })
          }
          defaultValue={formData.introduccion}
        />
        {"introduccion" in errors ? (
          <FormControl.ErrorMessage
            _text={{ fontSize: "xs", color: "error.500", fontWeight: 500 }}
          >
            Error campo requerido
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
        <FormControl.Label _text={{ bold: true }}>
          Descripcion
        </FormControl.Label>
        <TextArea
          placeholder="Descripcion"
          onChangeText={(value) => setData({ ...formData, descripcion: value })}
          defaultValue={formData.descripcion}
        />
        {"descripcion" in errors ? (
          <FormControl.ErrorMessage
            _text={{ fontSize: "xs", color: "error.500", fontWeight: 500 }}
          >
            Error campo requerido
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
        <Button onPress={pickIcon} mt={5}>
          Agrega una imagen para el Icono
        </Button>
        <Center> {icon && <Image source={{ uri: icon }} style={{ width: 50, height: 50, borderRadius:50}} />}</Center>
        {"btnIcono" in errors ? (
          <FormControl.ErrorMessage
            _text={{ fontSize: "xs", color: "error.500", fontWeight: 500 }}
          >
            Error campo requerido
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}

        <Button onPress={pickImage} mt={10}>
          Agrega una imagen para la portada
        </Button>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 200 }}
          />
        )}
        {"btnPortada" in errors ? (
          <FormControl.ErrorMessage
            _text={{ fontSize: "xs", color: "error.500", fontWeight: 500 }}
          >
            Error campo requerido
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
      </FormControl>
      <Button onPress={onSubmit} mt="5" colorScheme="cyan">
        Editar
      </Button>
      <Button mt="5" onPress={onDelete} colorScheme="secondary">
        Eliminar
      </Button>
    </VStack>
  );
};

export default Formulario;
