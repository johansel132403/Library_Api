CREATE TABLE IF NOT EXISTS providersusers(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL CHECK (name <> ''),
    lastname text NOT NULL CHECK (lastname <> ''),
    email text,
    password text
);

CREATE TABLE IF NOT EXISTS books(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    booksname text,
    edition text,
    years serial,
    language text,
    providerid INTEGER REFERENCES providersusers(id),
    image text,
    publisher text
);

-- INSERT providersuser
INSERT INTO providersuser(name, lastname, email, password )
       VALUES("johansel","perez","johansel@gmail.com","123456");


--INSERT books

INSERT INTO book(booksname,edition,years,language,providerId,image,publisher)
      VALUES('ROMEO Y JULIETA','VOL 1',1995,'espanol',1,'asdf','Ines');



--Alter

ALTER TABLE books
    ADD CONSTRAINT book_providerid_fkey
    FOREIGN KEY (providerid)
    REFERENCES books(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE;


      ALTER TABLE books
        add providerid INTEGER REFERENCES providersusers(id);

        ALTER TABLE books
        DROP years;

        ALTER TABLE books
        add years TEXT;
         












      ALTER TABLE providersusers 
        DROP CONSTRAINT book_providerid_fkey;
        ALTER TABLE
         FOREIGN KEY (id) 
        REFERENCES books (providerid)
       ON DELETE CASCADE;