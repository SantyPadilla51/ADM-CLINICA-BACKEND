import Paciente from "../models/PacienteModels.js";
import Historial from "../models/HistorialModel.js";
import Examen from "../models/ExamenModels.js";
import supabase from "../supabase/supabaseClient.js";

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.findAll({
    where: {
      doctorId: req.doctor.id,
    },
  });

  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { dni } = req.params;

  const paciente = await Paciente.findAll({
    where: { dni },
  });

  if (!paciente) {
    return res.status(404).json({
      msg: "El paciente ya no existe o fue eliminado.",
    });
  }

  const doctorIdPaciente = paciente[0].doctorId;

  if (doctorIdPaciente !== req.doctor.id) {
    res.json({ msg: "Accion no valida" });
  } else {
    res.json({ paciente });
  }
};

const obtenerPacienteID = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findOne({
      where: { id },
    });

    if (!paciente) {
      return res.status(404).json({
        msg: "El paciente ya no existe o fue eliminado.",
      });
    }

    if (paciente.doctorId !== req.doctor.id) {
      return res.status(403).json({
        msg: "Acción no válida. No tienes permisos para ver este paciente.",
      });
    }

    return res.json({ paciente });
  } catch (error) {
    console.error("Error al obtener el paciente:", error);
    return res.status(500).json({
      msg: "Hubo un error en el servidor al procesar la solicitud.",
    });
  }
};

const crearPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.doctorId = req.doctor.id;

  try {
    const pacienteGuardado = await paciente.save();

    if (pacienteGuardado) {
      res.status(200).json({
        ok: true,
        msg: "Paciente Creado Correctamente",
      });
    } else {
      return res.status(403).json({
        ok: false,
        msg: "El paciente no se pudo crear correctamente",
      });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findOne({
    where: { id },
  });

  if (!paciente) {
    return res.status(404).json({ msg: "El paciente no existe" });
  }

  const doctorIdPaciente = paciente.doctorId;

  if (doctorIdPaciente !== req.doctor.id) {
    res.json({ msg: "Accion no valida" });
  }

  try {
    const [filasActualizadas] = await Paciente.update(req.body, {
      where: { id },
    });

    if (filasActualizadas) {
      res.json({ ok: true, msg: "Paciente actualizado correctamente" });
    } else {
      res.json({ msg: "El paciente no se pudo actualizar" });
    }
  } catch (error) {
    res.json({ msg: "Ocurrio un error" });
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findOne({
    where: { id },
  });

  if (!paciente) {
    return res.status(404).json({ msg: "El paciente no existe" });
  }

  const doctorIdPaciente = paciente.doctorId;

  if (doctorIdPaciente !== req.doctor.id) {
    res.json({ msg: "Accion no valida" });
  } else {
    try {
      const pacienteEliminado = await Paciente.destroy({
        where: { id },
      });
      if (pacienteEliminado) {
        res.json({ ok: true, msg: "Paciente eliminado correctamente" });
      } else {
        res.json({ msg: "El paciente no se pudo eliminar" });
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  }
};

const obtenerHistorial = async (req, res) => {
  const { id } = req.params;

  const historial = await Historial.findAll({
    where: { pacienteId: id },
  });

  if (!historial) {
    return res.json({ msg: "El paciente no existe" });
  }

  res.json({ historial });
};

const crearHistorial = async (req, res) => {
  const historial = new Historial(req.body);
  historial.pacienteId = req.params.id;

  try {
    const historialGuardado = await historial.save();

    res.json({
      ok: true,
      msg: "Consulta creada correctamente",
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: error.message,
    });
  }
};

const eliminarHistorial = async (req, res) => {
  const { id } = req.params;

  const historial = await Historial.findByPk(id);

  if (!historial) {
    return res.json({ msg: "El historial no existe" });
  }

  try {
    const deleteConsulta = await historial.destroy();
    if (deleteConsulta) {
      res.json({ ok: true, msg: "Consulta eliminada correctamente" });
    } else {
      res.json({ msg: "El historial no se pudo eliminar" });
    }
  } catch (error) {
    res.json({ msg: "No se pudo eliminar el historial" });
  }
};

const crearExamen = async (req, res) => {
  const { descripcion, pacienteId, imagenUrl } = req.body;

  try {
    const examen = await Examen.create({
      descripcion,
      pacienteId,
      imagenUrl,
    });

    res.json({ ok: true, msg: "Examen guardado" });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

const eliminarExamen = async (req, res) => {
  const { id } = req.params;

  try {
    const examen = await Examen.findByPk(id);

    if (!examen) {
      return res.status(404).json({ ok: false, msg: "El examen no existe" });
    }

    if (examen.imagenUrl) {
      try {
        const urlPartes = examen.imagenUrl.split("/examenes/");
        const rutaArchivo = urlPartes[1];

        if (rutaArchivo) {
          console.log(
            "Intentando borrar del Storage de Supabase:",
            rutaArchivo,
          );

          const { error: storageError } = await supabase.storage
            .from("examenes")
            .remove([rutaArchivo]);

          if (storageError) {
            console.error(
              "Advertencia al eliminar la imagen de Supabase:",
              storageError.message,
            );
          } else {
            console.log("Imagen eliminada con éxito de Supabase Storage");
          }
        }
      } catch (errParsing) {
        console.error("Error al procesar la URL de la imagen:", errParsing);
      }
    }

    await examen.destroy();

    res.json({ ok: true, msg: "Examen e imagen eliminados correctamente" });
  } catch (error) {
    console.error("Error crítico en eliminarExamen:", error);
    res.status(500).json({
      ok: false,
      msg: "Error interno al eliminar el examen",
    });
  }
};

const obtenerExamenes = async (req, res) => {
  const { id } = req.params;

  try {
    const examenes = await Examen.findAll({
      where: { pacienteId: id },
    });

    if (!examenes || examenes.length === 0) {
      return res.status(404).json({ msg: "El paciente aun no tiene exámenes" });
    }

    const examenesConImagen = examenes.map((examen) => ({
      id: examen.id,
      pacienteId: examen.pacienteId,
      descripcion: examen.descripcion,
      fecha: examen.fecha,
      imagenUrl: examen.imagenUrl,
    }));

    res.json({ examenes: examenesConImagen });
  } catch (error) {
    console.error(error);
    res.json({ msg: "Error al obtener los exámenes" });
  }
};

export {
  obtenerPacientes,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
  obtenerPaciente,
  obtenerPacienteID,
  obtenerHistorial,
  crearHistorial,
  eliminarHistorial,
  obtenerExamenes,
  crearExamen,
  eliminarExamen,
};
