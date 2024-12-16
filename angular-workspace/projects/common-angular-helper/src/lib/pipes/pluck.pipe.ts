import { Pipe, type PipeTransform } from '@angular/core';
import type { UnknownRecord } from 'type-fest';

@Pipe({ name: 'pluck' })
export class PluckPipe implements PipeTransform {
  transform<TObj extends UnknownRecord, TKey extends keyof TObj>(
    input: TObj[],
    key: TKey
  ): TObj[TKey][] {
    return input.map((value) => value[key]);
  }
}
