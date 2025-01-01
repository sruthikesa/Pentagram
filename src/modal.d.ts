declare module "modal" {
  export class App {
    function(fn: Function, options?: { gpu?: boolean }): void;
    call(fnName: string, ...args: any[]): Promise<any>;
  }

  export class StableDiffusionPipeline {
    static from_pretrained(model: string): Promise<StableDiffusionPipeline>;
    to(device: string): void;
    generate(prompt: string): Promise<{ images: { toDataURL(): string }[] }>;
  }
}

declare module "@/modalInstance";
