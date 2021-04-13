When you are using json schema,
avoid using the same id's on different inputs...

for example...

    {
        type: "radio",
        name: "radio1",
        options: [
            {
                id: 1,
                value: "true",
                label: "Yes"
            },
            {
                id: 2,
                value: "true",
                label: "Yes"
            },
        ]
    },
    {
        type: "radio",
        name: "radio2",
        options: [
            {
                id: 1,
                value: "true",
                label: "Yes"
            },
            {
                id: 2,
                value: "true",
                label: "Yes"
            },
        ]
    }

Both radio1 and radio2 uses the same ID's...
it should be different like this...

    {
        type: "radio",
        name: "radio1",
        options: [
            {
                id: 1,
                value: "true",
                label: "Yes"
            },
            {
                id: 2,
                value: "true",
                label: "Yes"
            },
        ]
    },
    {
        type: "radio",
        name: "radio2",
        options: [
            {
                id: 3,
                value: "true",
                label: "Yes"
            },
            {
                id: 4,
                value: "true",
                label: "Yes"
            },
        ]
    }

It's better to not use the **ID's** in select/radio **options**.
