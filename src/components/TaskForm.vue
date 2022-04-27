<template>
    <FlexboxLayout flexDirection="column">
        <RadDataForm class="form-task" :source="taskForm" :metadata="meta" />
        <Button class="btn-1" text="Сохранить" @tap="saveTask" />
    </FlexboxLayout>
</template>

<script>
    export default {
        props: ["task"],
        data() {
            return {
                taskForm: {
                    name: this.task.name,
                    text: this.task.text
                },
                meta: {
                    commitMode: "Immediate",
                    validationMode: "Immediate",
                    propertyAnnotations: [{
                            name: "name",
                            displayName: "Название",
                            index: 0
                        },
                        {
                            name: "text",
                            displayName: "Описание",
                            index: 1
                        }
                    ]
                }
            };
        },
        methods: {
            saveTask() {
                if (this.taskForm.name !== "" && this.taskForm.text !== "") {
                    this.$emit("saveTask", {
                        name: this.taskForm.name,
                        text: this.taskForm.text
                    });
                } else {
                    alert({
                        title: "Ошибка!",
                        message: "Заполните все поля",
                        okButtonText: "ОК"
                    });
                }
            }
        }
    };
</script>

<style scoped>
    .form-task {
      margin-left: 40px;
    }
    .btn-1 {
        background-color: SlateBlue;
        color: white;
        font-size: 18px;
        border-radius: 100;
        margin-top: 80px;
        margin-bottom: 60px;
    }
</style>