export class Note {

    constructor(
        private id: number,
        private title: string,
        private isCompleted: boolean = false
    ){}

    getId(){
        return this.id;
    }

    getTitle(){
        return this.title;
    }

    setTitle(title: string){
        this.title = title;
    }

    getIsCompleted(){
        return this.isCompleted;
    }

    setIsCompleted(isCompleted: boolean){
        this.isCompleted = isCompleted;
    }

}