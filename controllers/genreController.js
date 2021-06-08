/*
 * @Author: xx
 * @Date: 2021-06-03 16:36:09
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-08 19:58:37
 * @FilePath: /helloworld/controllers/genreController.js
 */
const Genre = require("../models/genre");
const async = require("async");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([["name"]])
    .exec(function (err, list_genre) {
      if (err) {
        return next(err);
      }
      res.render("genre_list", { title: "Genre List", genre_list: list_genre });
    });
};

exports.genre_detail = (req, res, next) => {
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: function (callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        var err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

exports.genre_create_get = (req, res) => {
  res.render("genre_form", { title: "Create Genre" });
};

// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate that the name field is not empty.
  body("name", "Genre name required").isLength({ min: 1 }).trim(),

  // Sanitize (trim and escape) the name field.
  sanitizeBody("name").trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    var genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
        if (err) {
          return next(err);
        }

        if (found_genre) {
          // Genre exists, redirect to its detail page.
          res.redirect(found_genre.url);
        } else {
          genre.save(function (err) {
            if (err) {
              return next(err);
            }
            // Genre saved. Redirect to genre detail page.
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

exports.genre_delete_get = (req, res) => {
  res.send("未实现：genre删除表单的 GET");
};

exports.genre_delete_post = (req, res) => {
  res.send("未实现：删除genre的 POST");
};

exports.genre_update_get = (req, res) => {
  res.send("未实现：genre更新表单的 GET");
};

exports.genre_update_post = (req, res) => {
  res.send("未实现：更新genre的 POST");
};
