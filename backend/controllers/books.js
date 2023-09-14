const Book = require("../models/book");
const fs = require("fs");

exports.createBook = (req, res, next) => {
  // Parse le corps de la requête en un objet book
  console.log(req.body.book);
  const bookObject = JSON.parse(req.body.book);

  console.log(bookObject);
  delete bookObject.userId;
  // Crée une nouvelle instance de Book avec les propriétés de bookObject
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.name}`,
  });

  // Sauvegarde le livre dans la base de données
  book
    .save()
    .then(() => {
      console.log(book);
      res.status(201).json({ message: "Livre enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifyBook = (req, res, next) => {
  // Vérifie si un fichier a été téléchargé et met à jour l'objet book en conséquence
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.name
        }`,
      }
    : { ...req.body };

  // Recherche le livre dans la base de données par son id
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // Vérifie si l'utilisateur qui essaie de modifier le livre est l'auteur du livre
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        // Supprime l'ancienne image du livre s'il y en a une
        if (req.file && book.imageUrl) {
          const imagePath = book.imageUrl.split("/images/")[1];
          fs.unlink(`images/${imagePath}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
        // Met à jour le livre avec les nouvelles informations
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Livre modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteBook = (req, res, next) => {
  // Recherche le livre dans la base de données par son id
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // Vérifie si l'utilisateur qui essaie de supprimer le livre est l'auteur du livre
      if (book.userId != req.auth.userId) {
        res
          .status(401)
          .json({ message: "Compte non autorisé à supprimer ce livre" });
      } else {
        // Supprime le fichier image associé au livre
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          // Supprime le livre de la base de données
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Livre supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
exports.getOneBook = (req, res, next) => {
  // Recherche le livre dans la base de données par son id
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllBook = (req, res, next) => {
  // Récupère tous les livres de la base de données pour l'utilisateur spécifié par userId
  console.log("Recherche de livres pour userId :", req.auth.userId);
  console.log("Recherche de livres pour userId :");
  Book.find({ userId: req.auth.userId })
    .then((books) => {
      console.log("Livres récupérés avec succès :", books);
      if (books.length > 0) {
        console.log("userId du premier livre :", books[0].userId);
      }
      res.status(200).json(books);
    })
    .catch((error) => {
      console.error("Erreur lors de la recherche des livres :", error);
      res.status(400).json({ error });
    });
};
