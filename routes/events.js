const { Router } = require("express");
const {
  getEventos,
  crearEvento,
  eliminarEvento,
  actualizarEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");
const {isDate }= require("../helpers/isDate");

//todas tiene que pasar por la validacion del jwt

router.use(validarJWT);

//obtener eventos
router.get(
  "/",
  getEventos
);

//crear nuevo evento
router.post(
  "/",
    [
      check("title", "titulo es obligatorio").not().isEmpty(),
      check("start", "Fecha inicio es obligatoria").custom(isDate),
      check("end", "Fecha final es obligatoria").custom(isDate),
      validarCampos
    ],
  crearEvento
);

//actualizar evento
router.put("/:id",  [
  check("title", "titulo es obligatorio").not().isEmpty(),
  check("start", "Fecha inicio es obligatoria").custom(isDate),
  check("end", "Fecha final es obligatoria").custom(isDate),
  validarCampos
], actualizarEvento);

//borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
