import { Schema, model, models } from "mongoose";

const PetSchema = new Schema(
  {
    name: {
      type: String,

      required: [true, "El nombre es obligatorio"], // Mensaje personalizado para el campo requerido
    },
    color: {
      type: String,

      required: [true, " El color es obligatorio"],
    },
    peso: { type: Number, required: [true, " El peso es obligatorio"] },
    age: {
      type: Number,
      min: [0, "la edad minima es 0"],
      max: [20, "La edad máxima permitida es de 20 años"],
      required: true,
    },

    description: {
      type: String,
      required: [true, " El description es obligatorio"],
    },
  },
  {
    timestamps: true,
    //versionKey: false,
    collection: "Pet", // Nombre específico para la colección sino lo crea en asi "pets"
  }
);

// Crear el modelo pero verifica si existe ya el modelo , si exite lo devuelve directamente
const Pet = models.Pet || model("Pet", PetSchema);

export default Pet;
